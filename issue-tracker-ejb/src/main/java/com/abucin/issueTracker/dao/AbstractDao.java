package com.abucin.issueTracker.dao;

import java.util.List;

/**
 * Abstract DAO class that defines methods common for all DAO classes.
 *
 * @author ABucin
 */
public abstract class AbstractDao<ENTITY> {

    /**
     * Creates an entity.
     */
    public abstract void create(ENTITY entity);

    public abstract ENTITY retrieve(Long id);

    public abstract List<ENTITY> retrieveAll();

    public abstract ENTITY update(ENTITY entity);

    public abstract ENTITY delete(ENTITY entity);
}
