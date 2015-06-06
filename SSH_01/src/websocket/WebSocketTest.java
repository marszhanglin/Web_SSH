package websocket;
import java.io.IOException;
 
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
 /**
  * 
  * 描述  websocket   要下载websocket.jar包   或是jee7.0以上的包
  * /SSH_01/WebRoot/jsp/websocket/websocket.html
  * @author Mars zhang
  * @created 2015年5月7日 上午9:08:50
  */
@ServerEndpoint("/websocket")
public class WebSocketTest {
  
    private String client_id="";
  @OnMessage
  public void onMessage(String message, Session session)
    throws IOException, InterruptedException {
    System.out.println("client_id:"+client_id);
    client_id=session.getId();
    // 接收来自服务器的消息
    System.out.println("客户端"+session.getId()+": " + message);
    
    // 向客户端发送消息
    session.getBasicRemote().sendText("你好！客户端"+session.getId());
   
    // 每隔一段时间向客户端发送一个消息
    int sentMessages = 0;
    while(sentMessages < 3){
      Thread.sleep(1000*1);
      session.getBasicRemote().
        sendText("来自服务器端的消息. Count: "
          + sentMessages);
      sentMessages++;
    }
   
    // Send a final message to the client
    session.getBasicRemote().sendText("这是第"+sentMessages+"条消息，也是最后一条！");
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