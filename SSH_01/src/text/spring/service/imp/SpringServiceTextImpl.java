package text.spring.service.imp;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import text.spring.dao.SpringDaoText;
import text.spring.service.SpringServiceText;


/**
 * 
 * 描述  接口的实现
 * @author Mars zhang
 * @created 2015年3月31日 下午5:02:51
 */
@Service(SpringServiceText.interfaceName)
public class SpringServiceTextImpl implements SpringServiceText{
    
    /**
     * 面向接口编程
     */
    @Resource(name=SpringDaoText.interfaceName)
    private SpringDaoText daoText;
    
    
    @Override
    public void ServiceSys() { 
        System.out.println("Service sys  done");
        daoText.daosys();
    }

}
