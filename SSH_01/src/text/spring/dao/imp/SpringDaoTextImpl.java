package text.spring.dao.imp;

import org.springframework.stereotype.Repository;

import text.spring.dao.SpringDaoText;
@Repository(SpringDaoText.interfaceName)
public class SpringDaoTextImpl implements SpringDaoText {

    @Override
    public void daosys() {
        System.out.println("daosys");
    } 
}
