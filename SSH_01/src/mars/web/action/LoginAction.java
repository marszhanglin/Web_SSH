package mars.web.action;

public class LoginAction extends BaseAction{
	
	
	public String login(){
		System.out.println("login get。。。。。。。。。。");
		request.setAttribute("from_request_attribute", "i got the value from action");
		return "okyouhaslogin";
	}
}
