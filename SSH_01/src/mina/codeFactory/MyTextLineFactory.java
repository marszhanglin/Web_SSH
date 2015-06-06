package mina.codeFactory;

import mina.codeFactory.decode.MyTextLineCumulativeDecoder;
import mina.codeFactory.encoder.MyTextLineEncoder;

import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolEncoder;


/**
 * 
 * 描述   自定义  mina字符串编解码工厂
 * @author Mars zhang
 * @created 2015年5月16日 下午4:20:00
 */
public class MyTextLineFactory implements ProtocolCodecFactory {
    
//    private  MyTextLineDecoder myTextLineDecoder;  //没有数据防丢失操作
    private  MyTextLineEncoder myTextLineEncoder;
    private MyTextLineCumulativeDecoder myTextLineCumulativeDecoder;
    
    
    
    

    public MyTextLineFactory() {
        myTextLineEncoder=new MyTextLineEncoder();
        myTextLineCumulativeDecoder=new MyTextLineCumulativeDecoder();
    }

    @Override     //解码
    public ProtocolDecoder getDecoder(IoSession arg0) throws Exception {
        return myTextLineCumulativeDecoder;
    }

    @Override     //编码
    public ProtocolEncoder getEncoder(IoSession arg0) throws Exception {
        return myTextLineEncoder;
    }

}
