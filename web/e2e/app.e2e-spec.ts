import { EmotingWebAppPage } from './app.po';

describe('emoting-web-app App', function() {
  let page: EmotingWebAppPage;

  beforeEach(() => {
    page = new EmotingWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
