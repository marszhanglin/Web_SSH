package mina.handler;

import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;

import test.DoSomeThing;
/**
 * 
 * 描述   mina消息处理器    就是socket的子线程的消息处理     这里的主线程在spring中
 * @author Mars zhang
 * @created 2015年5月13日 下午5:48:20
 */
public class MyMinaHandler extends IoHandlerAdapter {
    //这个要有set方法
    private  DoSomeThing dosomethingParamName;
    public void setDosomethingParamName(DoSomeThing dosomethingParamName) {
        this.dosomethingParamName = dosomethingParamName;
    }

    @Override
    public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
        System.out.println("exceptionCaught"+cause.getMessage());
    }

    @Override
    public void inputClosed(IoSession session) throws Exception {
//        System.out.println("inputClosed");
    }
     
    @Override//接收到消息  回调
    public void messageReceived(IoSession session, Object message) throws Exception {
        System.out.println("messageReceived"+message);
    }
    
    @Override//发送消息  回调
    public void messageSent(IoSession session, Object message) throws Exception {
        System.out.println("messageSent"+message);
    }

    @Override
    public void sessionClosed(IoSession session) throws Exception {
        System.out.println("sessionClosed");
    }

    @Override
    public void sessionCreated(IoSession session) throws Exception {
        dosomethingParamName.syo("sessionCreated");
    }

    @Override//长时间没接收到客户端消息时  回调
    public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
        dosomethingParamName.syo("sessionIdle");
    }

    @Override
    public void sessionOpened(IoSession session) throws Exception {
        dosomethingParamName.syo("sessionOpened");
    }

}
