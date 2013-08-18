package com.abucin.issueTracker.util;

import javax.ejb.Stateless;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * Implementation of {@link IHibernateUtil}.
 *
 * @author ABucin
 */
@Stateless
public class HibernateUtil implements IHibernateUtil {

    private static SessionFactory sessionFactory;

    static {
        try {
            Configuration cfg = new Configuration();
            cfg.configure("hibernate.cfg.xml");
            sessionFactory = cfg.buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    @Override
    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
