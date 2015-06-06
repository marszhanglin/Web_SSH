package text.reflect.bean;

/**
 * 
 * 描述  提供反射使用的bean对象
 * @author Mars zhang
 * @created 2015年5月4日 上午10:48:20
 */
public class PersonImpl implements Person{
     
    public PersonImpl() {
         
    }
    public PersonImpl(String name){
        this.name=name;
    }
    public PersonImpl(int age){
        this.age=age;
    }
    public PersonImpl(String name, int age) {
        this.age=age;
        this.name=name;
    }
    public String getName() {
        return name;
    }
    public int getAge() {
        return age;
    }
    @Override
    public String toString(){
        return "["+this.name+"  "+this.age+"]";
    }
    private String name;
    private int age;
    
    /**
     * 
     * 描述 实现接口
     * @author Mars zhang
     * @created 2015年5月4日 上午11:00:16
     * @see text.reflect.bean.Person#dosomething()
     */
    @Override
    public void dosomething() {
        System.out.println("----------------------dosomething");
    }
}
 
/*class hello{
    public static void main(String[] args) {
        Class<?> demo=null;
        try{
            demo=Class.forName("Reflect.Person");
        }catch (Exception e) {
            e.printStackTrace();
        }
        Person per1=null;
        Person per2=null;
        Person per3=null;
        Person per4=null;
        //取得全部的构造函数
        Constructor<?> cons[]=demo.getConstructors();
        try{
            per1=(Person)cons[0].newInstance();
            per2=(Person)cons[1].newInstance("Rollen");
            per3=(Person)cons[2].newInstance(20);
            per4=(Person)cons[3].newInstance("Rollen",20);
        }catch(Exception e){
            e.printStackTrace();
        }
        System.out.println(per1);
        System.out.println(per2);
        System.out.println(per3);
        System.out.println(per4);
    }
}*/