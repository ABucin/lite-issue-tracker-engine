package com.abucin.issueTracker.util;

import javax.ejb.Local;
import org.hibernate.SessionFactory;

/**
 * Interface that exposes and loads Hibernate sessions and other useful stuff.
 *
 * @author ABucin
 */
@Local
public interface IHibernateUtil {

    /**
     * Retrieves SessionFactory for current project.
     *
     * @return the current session factory or null if not found
     */
    SessionFactory getSessionFactory();
}
