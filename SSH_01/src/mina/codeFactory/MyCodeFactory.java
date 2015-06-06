package mina.codeFactory;

import java.nio.charset.Charset;

import org.apache.mina.filter.codec.textline.TextLineCodecFactory;
/**
 * 
 * 描述  自定义mina编解码
 * @author Mars zhang
 * @created 2015年5月13日 下午6:07:26
 */
public class MyCodeFactory extends TextLineCodecFactory {

    public MyCodeFactory() {
        super(Charset.forName("UTF-8"));
    }

}
