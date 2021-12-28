import { controller, httpGet, BaseHttpController } from 'inversify-express-utils';

@controller('/')
export class HomeController extends BaseHttpController {
  @httpGet('/')
  public get() {
    const content = { foo: "bar" };
    const statusCode = 403;

    return this.json(content, statusCode);
  }
}