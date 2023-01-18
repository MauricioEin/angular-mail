import { Email } from "../models/email"
import { FilterBy } from "../models/filterBy"
import { Label } from "../models/label"
import { EMAIL_KEY } from "./email.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    removeMany,
    makeId,
    putMany,
    postLabel,
    putLabel
}

interface Entity {
    _id?: string
}
interface Res {
    emails: Email[]
    totalPages: number
}

async function query(entityType: string, filterBy: FilterBy = {}, delay = 300): Promise<{ entities: Entity[], totalPages: number }> {

    let entities = JSON.parse(localStorage.getItem(entityType) || 'null') || []
    let totalPages = 0
    if (entityType === EMAIL_KEY && Object.keys(filterBy).length)
        [entities, totalPages] = _filter(entities, filterBy)
    if (delay) {
        return new Promise((resolve) => setTimeout(resolve, delay, { entities, totalPages }))
    }
    return { entities, totalPages }
}

function _filter(entities: Email[], filterBy: FilterBy): [Email[], number] {
    const startIdx = filterBy.page! * filterBy.pageSize!
    const endIdx = startIdx + filterBy.pageSize!

    const txtRegex = new RegExp(filterBy.txt!, 'i')
    entities = entities.filter((entity: Email) => {
        return (
            (entity.tabs?.includes(filterBy.tab!)
                || entity.labels?.includes(filterBy.tab!))
            &&
            (!entity.tabs?.includes('trash') || filterBy.tab === 'trash')
            &&
            (txtRegex.test(entity.subject) ||
                txtRegex.test(entity.from!) ||
                txtRegex.test(entity.to))
        )
    })
    const totalPages = Math.ceil(entities.length / filterBy.pageSize!)
    return [entities.slice(startIdx, endIdx), totalPages]

}


async function get(entityType: string, entityId: string): Promise<Entity> {
    const { entities } = await query(entityType)
    const entity = entities.find(entity => entity._id === entityId)
    if (!entity) throw new Error(`Cannot get, Item ${entityId} of type: ${entityType} does not exist`)
    return entity;
}

async function post(entityType: string, newEntity: Email): Promise<Email> {
    newEntity = { ...newEntity, _id: makeId(), sentAt: Date.now() }
    const { entities } = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType: string, updatedEntity: Entity): Promise<Entity> {
    const { entities } = await query(entityType)
    const _idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities[_idx] = { ...entities[_idx], ...updatedEntity }
    _save(entityType, entities)
    return updatedEntity
}

async function putMany(entityType: string, updatedEntities: Email[]): Promise<Email[]> {
    const { entities } = await query(entityType)
    const updatedEmails: Email[] = []
    updatedEntities.forEach(updated => {
        const _idx = entities.findIndex(e => e._id === updated._id)
        entities[_idx] = updated
        updatedEmails.push(updated)
    })

    _save(entityType, entities)
    return new Promise((resolve) => resolve(updatedEmails))
}

async function remove(entityType: string, entityId: string): Promise<boolean> {
    const { entities } = await query(entityType)
    const _idx = entities.findIndex(entity => entity._id === entityId)
    if (_idx !== -1) entities.splice(_idx, 1)
    else throw new Error(`Cannot remove, item ${entityId} of type: ${entityType} does not exist`)
    _save(entityType, entities)
    return true;
}
async function removeMany(entityType: string, removedEntities: Email[]): Promise<Email[]> {
    var { entities } = await query(entityType)
    removedEntities.forEach(removed => {
        const _idx = entities.findIndex(e => e._id === removed._id)
        if (_idx !== -1) entities.splice(_idx, 1)
        else throw new Error(`Cannot remove, item ${removed._id} of type: ${entityType} does not exist`)
    })

    _save(entityType, entities)
    return new Promise((resolve) => resolve(removedEntities as Email[]))
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

async function postLabel(entityType: string, newLabel: Label): Promise<Label> {
    newLabel = { ...newLabel, _id: makeId() }
    const { entities } = await query(entityType)
    entities.push(newLabel)
    _save(entityType, entities)
    return newLabel
}

async function putLabel(entityType: string, updatedEntity: Label): Promise<Label> {
    const { entities } = await query(entityType)
    const _idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities[_idx] = { ...entities[_idx], ...updatedEntity }
    _save(entityType, entities)
    return updatedEntity
}
