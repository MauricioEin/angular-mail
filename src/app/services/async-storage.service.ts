import { filter } from "rxjs"
import { Email } from "../models/email"
import { FilterBy } from "../models/filterBy"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    removeMany,
    makeId
}

interface Entity {
    _id?: string
}

async function query(entityType: string, filterBy: FilterBy = {}, delay = 1000): Promise<Entity[]> {
    console.log('filterBySTorage:',filterBy)
    let entities = JSON.parse(localStorage.getItem(entityType) || 'null') || []
    const startIdx = filterBy.page! * filterBy.pageSize!
    const endIdx = startIdx + filterBy.pageSize!
    console.log('start end idx:',startIdx, endIdx)

    const txtRegex = new RegExp(filterBy.txt!, 'i')
    console.log('txtRegex:',txtRegex)
    entities = entities.filter((entity: Email) => { 
        return (
        entity.tabs?.includes(filterBy.tab!) &&
            (txtRegex.test(entity.subject) ||
                txtRegex.test(entity.from) ||
                txtRegex.test(entity.to))
        )
    }).slice(startIdx, endIdx)
    console.log(entities)
    if (delay) {
        return new Promise((resolve) => setTimeout(resolve, delay, entities))
    }
    return entities
}

async function get(entityType: string, entityId: string): Promise<Entity> {
    const entities = await query(entityType)
    const entity = entities.find(entity => entity._id === entityId)
    if (!entity) throw new Error(`Cannot get, Item ${entityId} of type: ${entityType} does not exist`)
    return entity;
}

async function post(entityType: string, newEntity: Entity): Promise<Entity> {
    newEntity = { ...newEntity, _id: makeId() }
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType: string, updatedEntity: Entity): Promise<Entity> {
    const entities = await query(entityType)
    const _idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities[_idx] = updatedEntity
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType: string, entityId: string): Promise<boolean> {
    const entities = await query(entityType)
    const _idx = entities.findIndex(entity => entity._id === entityId)
    if (_idx !== -1) entities.splice(_idx, 1)
    else throw new Error(`Cannot remove, item ${entityId} of type: ${entityType} does not exist`)
    _save(entityType, entities)
    return true;
}
async function removeMany(entityType: string, removedEntities: Email[]): Promise<Email[]> {
    const entities = await query(entityType)
    removedEntities.forEach(removed => {
        const _idx = entities.findIndex(e => e._id === removed._id)
        if (_idx !== -1) entities.splice(_idx, 1)
        else throw new Error(`Cannot remove, item ${removed._id} of type: ${entityType} does not exist`)

    })
    _save(entityType, entities)
    // return entities as Email[]
    return new Promise((resolve) => resolve(entities as Email[]))

}


function _save(entityType: string, entities: Entity[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
