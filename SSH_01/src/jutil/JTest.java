package jutil;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import text.spring.service.SpringServiceText;

public class JTest {
    private ApplicationContext ac=new ClassPathXmlApplicationContext("beans.xml");
    
    
    
    
    @Test
    public void sys(){
        System.out.println(1231231231);
        SpringServiceText springServiceText=(SpringServiceText) ac.getBean(SpringServiceText.interfaceName);
        springServiceText.ServiceSys();
    }
}
