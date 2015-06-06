package mina.codeFactory.encoder;

import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;


/**
 * 
 * 描述   mina的编码   然后提供给客户端
 * @author Mars zhang
 * @created 2015年5月16日 下午3:25:04
 */
public class MyTextLineEncoder implements ProtocolEncoder {

    @Override
    public void dispose(IoSession ioSession) throws Exception {

    }

    @Override   //对象到字节的装换        这里是对字符串对象转成字节
    public void encode(IoSession ioSession, Object object, ProtocolEncoderOutput protocolEncoderOutput) throws Exception {
        
        String strTemp=null;
        //这个对象是否是这个特定类或者是它的子类的一个实例。      这里就是是不是字符串
        if(object instanceof String ){
            strTemp=(String)object;
        }
        
        if(null!=strTemp){
            //把utf-8存在session中
            CharsetEncoder charsetEncoder=(CharsetEncoder) ioSession.getAttribute("charsetEncoder");
            
            //当session中无charsetEncoder时获取系统的字符编码并存在session中
            if(null==charsetEncoder){
                charsetEncoder=Charset.defaultCharset().newEncoder();
                ioSession.setAttribute("charsetEncoder", charsetEncoder);
            }
            
            //开辟一个内存   长度为字符串的长度
            IoBuffer ioBuffer=IoBuffer.allocate(strTemp.length());
            //设置这个内存为可放大的
            ioBuffer.setAutoExpand(true);
            ioBuffer.putString(strTemp, charsetEncoder );
            ioBuffer.flip();
            protocolEncoderOutput.write(ioBuffer);
        }
    }
}
