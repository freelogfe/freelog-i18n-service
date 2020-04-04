import { provide, inject, Context, controller, Application, get } from 'midway'

@provide()
@controller('/github/oAuth')
export class GithubOAuthController {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  @inject()
  ctx: Context

  @get('/access')
  async getGithubOAuthAccessToken(): Promise<void> {
    const { client_id, client_secret, code } = this.ctx.request.body
    const response = await this.app.curl(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`, {
      method: 'post',
      dataType: 'json',
    })
    const oAuthData = response.data
    if (oAuthData.error) {
      throw new Error(oAuthData.error)
    } else {
      this.ctx.success(oAuthData)
    }
  }

  async getGithubUserInfo(): Promise<void> {
    const { accessToken } = this.ctx.request.query
    const response = await this.app.curl('https://api.github.com/user', {
      method: 'get',
      dataType: 'json',
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    })
    this.ctx.success(response.data)
  }
}
