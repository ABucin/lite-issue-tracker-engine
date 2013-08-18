package com.abucin.issueTracker.service;

/**
 * Defines methods common for all Service classes.
 *
 * @author ABucin
 */
public class AbstractService<ENTITY> {
    
    private ENTITY entity;
    
    public AbstractService(){
        
    }
    
    public AbstractService(ENTITY entity){
        this.entity = entity;
    }
    
}
