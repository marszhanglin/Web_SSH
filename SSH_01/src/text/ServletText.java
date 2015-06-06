package text;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * 
 * 描述      测试学习用servlet
 * @author Mars zhang
 * @created 2015年3月31日 下午2:45:32
 */
@SuppressWarnings("serial")
public class ServletText extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        so("doGet");
        /*使用request的getRequestDispatcher(“XXX.jsp”).forward(request,response);
                            进行跳转…页面是使用EL表达式或者<%=作用域.getAttribute(“xxx”)%>去取得即可*/
        req.setAttribute("reqSetAttribute", "从request获取到Attribute了");
        RequestDispatcher rd= req.getRequestDispatcher("index.jsp");
        rd.forward(req, resp);
//        super.doGet(req, resp);  //这里就不用super了
        return ;
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        so("doPost"); 
        super.doPost(req, resp);
        /*resp.sendRedirect("index.jsp");
                        使用request的getRequestDispatcher(“XXX.jsp”).forward(request,response);
                        进行跳转…页面是使用EL表达式或者<%=作用域.getAttribute(“xxx”)%>去取得即可*/
        req.setAttribute("reqSetAttribute", "从request获取到Attribute了") ;
//        req.getRequestDispatcher("index.jsp").forward(req, resp);
        resp.sendRedirect("index.jsp");
    }
    
    
    
    /**
     * 
     * 描述 System.out.println
     * @author Mars zhang
     * @created 2015年3月13日 上午10:52:53
     * @param saywhat
     */
    private void so(String saywhat){ 
        System.out.println(saywhat);
    }

}
