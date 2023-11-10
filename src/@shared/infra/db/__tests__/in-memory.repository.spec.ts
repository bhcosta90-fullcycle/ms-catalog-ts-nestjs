import {InMemoryRepository} from "../in-memory.repository";
import {EntityAbstract, EntityProps} from "../../../domains/entity.abstract";
import {UniqueId} from "../../../domains/vo/unique-id.vo";
import {NotFoundError} from "../../../domains/exceptions/not-found.error";

type StubEntityConstructor = {
  name: string;
  price: number;
};

class StubEntity extends EntityAbstract {
  name: string;
  price: number;

  constructor(props: StubEntityConstructor & EntityProps) {
    super(props);
    this.name = props.name;
    this.price = props.price;
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, UniqueId> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemory Repository Unit Test", () => {
  let repo: InMemoryRepository<StubEntity, UniqueId>
  let entity : StubEntity;
  let entity2 : StubEntity;
  let entity3 : StubEntity;

  beforeEach(() => {
    repo = new StubInMemoryRepository()
    entity = new StubEntity({name: 'testing', price: 10})
    entity2 = new StubEntity({name: 'testing 2', price: 10})
    entity3 = new StubEntity({name: 'testing 3', price: 10})
  })

  test("should insert a new entity", async() => {
    await repo.insert(entity);
    expect(repo.items.length).toBe(1)
    expect(repo.items[0]).toBe(entity);
  })

  test("should bulk insert a new entity", async() => {
    await repo.bulkInsert([entity, entity2, entity3]);
    expect(repo.items.length).toBe(3)
    expect(repo.items[0]).toBe(entity);
    expect(repo.items[1]).toBe(entity2);
    expect(repo.items[2]).toBe(entity3);
  })

  test("should returns all entities", async () => {
    await repo.insert(entity);
    const entities = await repo.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await expect(repo.update(entity)).rejects.toThrow(
        new NotFoundError(entity.id, StubEntity)
    );
  });

  it("should updates an entity", async () => {
    await repo.insert(entity);
    const entityUpdated = new StubEntity({
      id: entity.id.toString(),
      name: "updated",
      price: 1,
    });
    await repo.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repo.items[0].toJSON());
  });

  it("should throws error on find id when entity not found", async () => {
    const uuid = new UniqueId();
    await expect(repo.findById(uuid)).rejects.toThrow(
        new NotFoundError(uuid.value, StubEntity)
    );

    await expect(
        repo.findById(new UniqueId("9366b7dc-2d71-4799-b91c-c64adb205104"))
    ).rejects.toThrow(
        new NotFoundError("9366b7dc-2d71-4799-b91c-c64adb205104", StubEntity)
    );
  });

  it("should find id an entity", async () => {
    await repo.insert(entity);
    const entityFound = await repo.findById(entity.id);
    expect(entityFound).toBe(entity);
  });

  it("should throws error on delete when entity not found", async () => {
    const uuid = new UniqueId();
    await expect(repo.delete(uuid)).rejects.toThrow(
        new NotFoundError(uuid.value, StubEntity)
    );

    await expect(
        repo.delete(new UniqueId("9366b7dc-2d71-4799-b91c-c64adb205104"))
    ).rejects.toThrow(
        new NotFoundError("9366b7dc-2d71-4799-b91c-c64adb205104", StubEntity)
    );
  });

  it("should deletes an entity", async () => {
    await repo.insert(entity);
    await repo.delete(entity.id);
    expect(repo.items).toHaveLength(0);
  });
});
