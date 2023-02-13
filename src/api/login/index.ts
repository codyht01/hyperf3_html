import request from '/@/utils/request';

/**
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
	return {
		//账号密码登录
		signIn: (data: object) => {
			return request({
				url: '/login/doLogin',
				method: 'post',
				data,
			});
		},
		//退出登录
		signOut: (data: object) => {
			return request({
				url: '/login/logout',
				method: 'post',
				data,
			});
		},
		//发送验证码
		sendCode:(data:object)=>{
			return request({
				url: '/login/sendCode',
				method: 'post',
				params:data,
			});
		}
	};
}
