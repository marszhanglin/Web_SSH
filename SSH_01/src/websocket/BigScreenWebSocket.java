package websocket;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
/**
 * 
 * 描述   js与后台的通信
 * @author Mars zhang
 * @created 2015年5月13日 下午5:43:31
 */
@ServerEndpoint(value = "/bigSceenWebsocket")
public class BigScreenWebSocket {
    @OnMessage
    public void onMessage(String message, Session session)
      throws IOException, InterruptedException {
      
      // 接收来自服务器的消息
      System.out.println("客户端"+session.getId()+": " + message);
      session.getMaxIdleTimeout();
      // 向客户端发送消息
      session.getBasicRemote().sendText("你好！客户端"+session.getId());
    }
     
    @OnOpen
    public void onOpen() {
      System.out.println("收到来自客户端的连接！");
    }
   
    @OnClose
    public void onClose() {
      System.out.println("websocket关闭");
    }
}
