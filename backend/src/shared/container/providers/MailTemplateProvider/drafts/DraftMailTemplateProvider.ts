import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class DraftMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
