package mina.codeFactory.decode;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
/**
 * 
 * 描述   mina 的解码
 * @author Mars zhang
 * @created 2015年5月16日 下午3:55:44
 */
public class MyTextLineDecoder implements ProtocolDecoder {

    @Override    
    public void decode(IoSession ioSession, IoBuffer ioBuffer, ProtocolDecoderOutput output) throws Exception {
        
        int startPosition = ioBuffer.position();  //获取读取位置
        while(ioBuffer.hasRemaining()){   //有数据时一直循环     一个字符一个字符的度？
            byte b=ioBuffer.get();     //执行这个操作  位置会变化  操作所以下面比较多
            if(b=='\n'){  //换行符时停止读取
                int currentPosition=ioBuffer.position();//记录当前位置    temp的作用
                int limit=ioBuffer.limit();             //记录截取的位置  temp的作用        
                
                ioBuffer.position(startPosition);  //从定向的开始的位置
                ioBuffer.limit(currentPosition);    //截取到当前位置
                
                IoBuffer sliceBuf= ioBuffer.slice();          //执行截取操作     获取截取的内存 
                byte [] dest =new byte[sliceBuf.limit()];
                sliceBuf.get(dest);      //这样dest就有数据了
                
                String str=new String(dest);
                output.write(str);   //写出数据
                
                
                ioBuffer.position(currentPosition);//再把位置还原回去  防止位置还在‘\n’前面出现死循环
                ioBuffer.position(limit);          //再把位置还原回去
                
            }
        }
    }

    @Override
    public void dispose(IoSession ioSession) throws Exception {

    }

    @Override
    public void finishDecode(IoSession ioSession, ProtocolDecoderOutput output) throws Exception {

    }

}
