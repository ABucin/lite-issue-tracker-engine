package com.abucin.issueTracker.dao;

import com.abucin.issueTracker.util.IHibernateUtil;
import java.util.List;
import javax.ejb.EJB;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 * Defines methods common for all DAO classes.
 *
 * @author ABucin
 */
public abstract class AbstractDao<ENTITY> {

    // <editor-fold defaultstate="collapsed" desc="EJB">
    @EJB
    private IHibernateUtil hibernateUtil;
    // </editor-fold>
    private ENTITY entity;
    private static final String ENTITY_ID = "id";

    public AbstractDao() {
    }

    public AbstractDao(ENTITY entity) {
        this.entity = entity;
    }

    /**
     * Creates and persists the given entity.
     *
     * @param entity the given entity we wish to persist
     */
    public void create(ENTITY entity) {
        Session session = hibernateUtil.getSessionFactory().getCurrentSession();
        session.persist(entity);
    }

    /**
     * Retrieves an entity based on a given id.
     *
     * @param id the id of the entity we wish to retrieve
     * @return the entity if found or null otherwise.
     */
    public ENTITY retrieve(Long id) {
        Session session = hibernateUtil.getSessionFactory().getCurrentSession();
        Criteria criteria = session.createCriteria(entity.getClass());
        criteria.add(Restrictions.eq(ENTITY_ID, id));
        return (ENTITY) criteria.uniqueResult();
    }

    /**
     * Retrieves a list of all the entities available.
     *
     * @return the list of all the entities of type ENTITY or an empty list if
     * nothing is found
     */
    public List<ENTITY> retrieveAll() {
        Session session = hibernateUtil.getSessionFactory().getCurrentSession();
        Criteria criteria = session.createCriteria(entity.getClass());
        return (List<ENTITY>) criteria.list();
    }

    public abstract ENTITY update(ENTITY entity);

    public abstract ENTITY delete(ENTITY entity);
}
