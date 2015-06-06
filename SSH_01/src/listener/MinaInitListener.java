package listener;

import java.io.IOException;
import java.net.InetSocketAddress;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import mina.codeFactory.MyTextLineFactory;
import mina.handler.MyMinaHandler;

import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.filter.logging.LoggingFilter;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;
/**
 * 
 * 描述  第二种方式启用mina
 * 当没有Spring时我们要在容器启动时自己启动mina  
 * @author Mars zhang
 * @created 2015年5月15日 上午11:40:26
 */
public class MinaInitListener implements ServletContextListener {
    IoAcceptor acceptor=null;
        
    @Override  //当容销毁时解绑mina端口
    public void contextDestroyed(ServletContextEvent arg0) {
        if(null!=acceptor){
            acceptor.unbind(new InetSocketAddress(10001));
        }
        
    }

    @Override  //当容销毁时开启mina
    public void contextInitialized(ServletContextEvent arg0) {
        System.out.println("------------------------mina10001-初始化了");
        acceptor = new NioSocketAcceptor();

        acceptor.getFilterChain().addLast( "logger", new LoggingFilter() );
//        acceptor.getFilterChain().addLast( "codec", new ProtocolCodecFilter( new TextLineCodecFactory( Charset.forName( "UTF-8" ))));
        acceptor.getFilterChain().addLast( "codec", new ProtocolCodecFilter(new MyTextLineFactory()));
        
        acceptor.setHandler( new MyMinaHandler() );
        acceptor.getSessionConfig().setReadBufferSize( 2048 );
        acceptor.getSessionConfig().setIdleTime( IdleStatus.BOTH_IDLE, 10 );
        try {
            acceptor.bind( new InetSocketAddress(10001) );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
