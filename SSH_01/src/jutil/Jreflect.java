package jutil;

import java.lang.reflect.Field;

import org.junit.Test;

import text.reflect.bean.PersonImpl;

/**
 * 
 * 描述 测试反射的jutil
 * 
 * @author Mars zhang
 * @created 2015年5月4日 上午10:49:33
 */
public class Jreflect {

    @Test
    public void getClassName(){  
        Class<?> demo1=null;
        Class<?> demo2=null;
        Class<?> demo3=null;
        //方式一：
        try {
            demo1=Class.forName("text.reflect.bean.PersonImpl");
        } catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
      //方式二：
        demo2=new PersonImpl().getClass();
      //方式三：
        demo3=PersonImpl.class;
        System.out.println("类名：\n"+demo1.getName()+"\n"+demo2.getName()+"\n"+demo3.getName());
            
        
        
        /*Class<?> demo1=null;
            Class<?> demo2=null;
            Class<?> demo3=null;
            demo1=Class.forName(""); /*try{
                        //一般尽量采用这种形式
                demo1=Class.forName("Reflect.Demo");
                    }catch(Exception e){
                       e.printStackTrace();
                    }
                    demo2=new Demo().getClass();
                    demo3=Demo.class;
                     
                    System.out.println("类名称   "+demo1.getName());
                    System.out.println("类名称   "+demo2.getName());
                    System.out.println("类名称   "+demo3.getName()); */
    }

    // @Test
    public void get() {
    }

}
/*
 * Class<?> demo=null; try{ demo=Class.forName("Reflect.Person"); }catch
 * (Exception e) { e.printStackTrace(); } Person per1=null; Person per2=null;
 * Person per3=null; Person per4=null; //取得全部的构造函数 Constructor<?>
 * cons[]=demo.getConstructors(); try{ per1=(Person)cons[0].newInstance();
 * per2=(Person)cons[1].newInstance("Rollen");
 * per3=(Person)cons[2].newInstance(20);
 * per4=(Person)cons[3].newInstance("Rollen",20); }catch(Exception e){
 * e.printStackTrace(); } System.out.println(per1); System.out.println(per2);
 * System.out.println(per3); System.out.println(per4);
 */