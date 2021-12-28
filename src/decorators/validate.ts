import { validate, ValidationError } from "class-validator";
import { plainToClass, plainToInstance } from "class-transformer";

function validationFactory<T>(metadataKey: Symbol, model: { new(...args: any[]): T }, source: "body" | "query") {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(metadataKey, model, target, propertyName);

        const method = descriptor.value;
        descriptor.value = async function () {
            const model = Reflect.getOwnMetadata(metadataKey, target, propertyName);

            const [req, res] = arguments;
            const plain = req.params
            //[source];

            const errors = await validate(plainToInstance(model, plain));
            if (errors.length > 0) {
                res.status(400).json(transformValidationErrorsToJSON(errors));
                return;
            }

            return method.apply(this, arguments);
        };
    };
}

export const ValidateQuery = (dto: any) => validationFactory(Symbol("validate-query"), dto, "query");
export const ValidateBody = (dto: any) => validationFactory(Symbol("validate-body"), dto, "body");

function transformValidationErrorsToJSON(errors: ValidationError[]) {
    return errors.reduce((p: { [k: string]: any }, c: ValidationError) => {
        if (!c.children || !c.children.length) {
            const constraints = c.constraints;
            if (constraints) {
                p[c.property] = Object.keys(constraints).map(key => constraints[key]);
            }
        } else {
            p[c.property] = transformValidationErrorsToJSON(c.children);
        }
        return p;
    }, {});
}