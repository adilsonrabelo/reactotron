import filterCommands, {
  filterSearch,
  filterHidden,
  filterStatusCategory,
  getAvailableStatusCategories,
} from "./index"
import { CommandType } from "reactotron-core-contract"

const TEST_COMMANDS = [
  { type: "SEARCHTYPE" },
  { type: "ADUMMYOBJ", payload: { message: "SEARCHMESSAGE" } },
  { type: "ADUMMYOBJ", payload: { preview: "SEARCHPREVIEW" } },
  { type: "ADUMMYOBJ", payload: { name: "SEARCHNAME" } },
  { type: "ADUMMYOBJ", payload: { path: "SEARCHPATH" } },
  { type: "ADUMMYOBJ", payload: { triggerType: "SEARCHTRIGGERTYPE" } },
  { type: "ADUMMYOBJ", payload: { description: "SEARCHDESCRIPTION" } },
  { type: "ADUMMYOBJ", payload: { request: { url: "SEARCHURL" } } },
  { type: "REGEX", payload: { message: "[1234] Log text" } },
  { type: "REGEX", payload: { message: "123 Log text" } },
  { type: "REGEX", payload: { message: "Log text (123)" } },
  { type: "log", payload: { debug: "LOGDEBUG" } },
  { type: "client.intro", payload: { connection: "SEARCHCONNECTION" } },
  {
    type: "ADUMMYOBJ",
    payload: {
      request: {
        data: '{"operationName":"SEARCHDATA","variables":{"testing":{"nested":"thing"}},"query":"query LaunchList {\\n  launches {\\n    id\\n }\\n}\\n"}',
      },
    },
  },
]

const TESTS = [
  { name: "type", search: "SEARCHTYPE", result: [{ type: "SEARCHTYPE" }] },
  {
    name: "payload.message",
    search: "SEARCHMESSAGE",
    result: [{ type: "ADUMMYOBJ", payload: { message: "SEARCHMESSAGE" } }],
  },
  {
    name: "payload.preview",
    search: "SEARCHPREVIEW",
    result: [{ type: "ADUMMYOBJ", payload: { preview: "SEARCHPREVIEW" } }],
  },
  {
    name: "payload.name",
    search: "SEARCHNAME",
    result: [{ type: "ADUMMYOBJ", payload: { name: "SEARCHNAME" } }],
  },
  {
    name: "payload.path",
    search: "SEARCHPATH",
    result: [{ type: "ADUMMYOBJ", payload: { path: "SEARCHPATH" } }],
  },
  {
    name: "payload.triggerType",
    search: "SEARCHTRIGGERTYPE",
    result: [{ type: "ADUMMYOBJ", payload: { triggerType: "SEARCHTRIGGERTYPE" } }],
  },
  {
    name: "payload.description",
    search: "SEARCHDESCRIPTION",
    result: [{ type: "ADUMMYOBJ", payload: { description: "SEARCHDESCRIPTION" } }],
  },
  {
    name: "payload.request.url",
    search: "SEARCHURL",
    result: [{ type: "ADUMMYOBJ", payload: { request: { url: "SEARCHURL" } } }],
  },
  {
    name: "payload.request.data",
    search: "SEARCHDATA",
    result: [
      {
        type: "ADUMMYOBJ",
        payload: {
          request: {
            data: '{"operationName":"SEARCHDATA","variables":{"testing":{"nested":"thing"}},"query":"query LaunchList {\\n  launches {\\n    id\\n }\\n}\\n"}',
          },
        },
      },
    ],
  },
  {
    name: "log => debug",
    search: "debug",
    result: [{ type: "log", payload: { debug: "LOGDEBUG" } }],
  },
  {
    name: "log => warning",
    search: "warning",
    result: [{ type: "log", payload: { debug: "LOGDEBUG" } }],
  },
  {
    name: "log => error",
    search: "error",
    result: [{ type: "log", payload: { debug: "LOGDEBUG" } }],
  },
  {
    name: "clientIntro => connection",
    search: "connection",
    result: [{ type: "client.intro", payload: { connection: "SEARCHCONNECTION" } }],
  },
  {
    name: "multiple results",
    search: "ADUMMYOBJ",
    result: [
      { type: "ADUMMYOBJ", payload: { message: "SEARCHMESSAGE" } },
      { type: "ADUMMYOBJ", payload: { preview: "SEARCHPREVIEW" } },
      { type: "ADUMMYOBJ", payload: { name: "SEARCHNAME" } },
      { type: "ADUMMYOBJ", payload: { path: "SEARCHPATH" } },
      { type: "ADUMMYOBJ", payload: { triggerType: "SEARCHTRIGGERTYPE" } },
      { type: "ADUMMYOBJ", payload: { description: "SEARCHDESCRIPTION" } },
      { type: "ADUMMYOBJ", payload: { request: { url: "SEARCHURL" } } },
      {
        type: "ADUMMYOBJ",
        payload: {
          request: {
            data: '{"operationName":"SEARCHDATA","variables":{"testing":{"nested":"thing"}},"query":"query LaunchList {\\n  launches {\\n    id\\n }\\n}\\n"}',
          },
        },
      },
    ],
  },
  {
    name: "deep search results",
    search: "SEARCH",
    result: [
      { type: "SEARCHTYPE" },
      { type: "ADUMMYOBJ", payload: { message: "SEARCHMESSAGE" } },
      { type: "ADUMMYOBJ", payload: { preview: "SEARCHPREVIEW" } },
      { type: "ADUMMYOBJ", payload: { name: "SEARCHNAME" } },
      { type: "ADUMMYOBJ", payload: { path: "SEARCHPATH" } },
      { type: "ADUMMYOBJ", payload: { triggerType: "SEARCHTRIGGERTYPE" } },
      { type: "ADUMMYOBJ", payload: { description: "SEARCHDESCRIPTION" } },
      { type: "ADUMMYOBJ", payload: { request: { url: "SEARCHURL" } } },
      {
        type: "ADUMMYOBJ",
        payload: {
          request: {
            data: '{"operationName":"SEARCHDATA","variables":{"testing":{"nested":"thing"}},"query":"query LaunchList {\\n  launches {\\n    id\\n }\\n}\\n"}',
          },
        },
      },
    ],
  },
  {
    name: "deep search results - even deeper",
    search: "ME",
    result: [
      { type: "ADUMMYOBJ", payload: { message: "SEARCHMESSAGE" } },
      { type: "ADUMMYOBJ", payload: { name: "SEARCHNAME" } },
      {
        type: "ADUMMYOBJ",
        payload: {
          request: {
            data: '{"operationName":"SEARCHDATA","variables":{"testing":{"nested":"thing"}},"query":"query LaunchList {\\n  launches {\\n    id\\n }\\n}\\n"}',
          },
        },
      },
    ],
  },
  {
    name: "deep search results - case insensitive",
    search: "me",
    result: [
      { type: "ADUMMYOBJ", payload: { message: "SEARCHMESSAGE" } },
      { type: "ADUMMYOBJ", payload: { name: "SEARCHNAME" } },
      {
        type: "ADUMMYOBJ",
        payload: {
          request: {
            data: '{"operationName":"SEARCHDATA","variables":{"testing":{"nested":"thing"}},"query":"query LaunchList {\\n  launches {\\n    id\\n }\\n}\\n"}',
          },
        },
      },
    ],
  },
  {
    name: "deep search results - type case insensitive",
    search: "myobj",
    result: [
      { type: "ADUMMYOBJ", payload: { message: "SEARCHMESSAGE" } },
      { type: "ADUMMYOBJ", payload: { preview: "SEARCHPREVIEW" } },
      { type: "ADUMMYOBJ", payload: { name: "SEARCHNAME" } },
      { type: "ADUMMYOBJ", payload: { path: "SEARCHPATH" } },
      { type: "ADUMMYOBJ", payload: { triggerType: "SEARCHTRIGGERTYPE" } },
      { type: "ADUMMYOBJ", payload: { description: "SEARCHDESCRIPTION" } },
      { type: "ADUMMYOBJ", payload: { request: { url: "SEARCHURL" } } },
      {
        type: "ADUMMYOBJ",
        payload: {
          request: {
            data: '{"operationName":"SEARCHDATA","variables":{"testing":{"nested":"thing"}},"query":"query LaunchList {\\n  launches {\\n    id\\n }\\n}\\n"}',
          },
        },
      },
    ],
  },
  {
    name: "search that results in a invalid regex",
    search: "[123",
    result: [{ type: "REGEX", payload: { message: "[1234] Log text" } }],
  },
  {
    name: "another search that results in a invalid regex",
    search: "123)",
    result: [{ type: "REGEX", payload: { message: "Log text (123)" } }],
  },
]

describe("utils/filterCommands", () => {
  describe("filterSearch", () => {
    TESTS.forEach((test) => {
      it(`should search in '${test.name}'`, () => {
        const result = filterSearch(TEST_COMMANDS, test.search)

        expect(result).toEqual(test.result)
      })
    })
  })

  describe("filterHidden", () => {
    it("should filter out only command types that are in the list", () => {
      const result = filterHidden(TEST_COMMANDS, [CommandType.ClientIntro])

      expect(result).toEqual(TEST_COMMANDS.filter((tc) => tc.type !== CommandType.ClientIntro))
    })
  })

  describe("filterCommands", () => {
    TESTS.forEach((test) => {
      it(`should search in '${test.name}'`, () => {
        const result = filterCommands(TEST_COMMANDS, test.search, [])

        expect(result).toEqual(test.result)
      })
    })

    it("should filter out only command types that are in the list", () => {
      const result = filterCommands(TEST_COMMANDS, "", [CommandType.ClientIntro])

      expect(result).toEqual(TEST_COMMANDS.filter((tc) => tc.type !== CommandType.ClientIntro))
    })
  })

  describe("getAvailableStatusCategories", () => {
    it("should return an empty array when there are no API response commands", () => {
      expect(getAvailableStatusCategories(TEST_COMMANDS)).toEqual([])
    })

    it("should return only the categories present, in success/redirect/clientError/serverError order", () => {
      const commands = [
        { type: CommandType.ApiResponse, payload: { response: { status: 500 } } },
        { type: CommandType.ApiResponse, payload: { response: { status: 200 } } },
        { type: CommandType.ApiResponse, payload: { response: { status: 201 } } },
      ]

      expect(getAvailableStatusCategories(commands)).toEqual(["success", "serverError"])
    })
  })

  describe("filterStatusCategory", () => {
    const API_COMMANDS = [
      { type: CommandType.ApiResponse, payload: { response: { status: 200 } } },
      { type: CommandType.ApiResponse, payload: { response: { status: 404 } } },
      { type: CommandType.ApiResponse, payload: { response: { status: 500 } } },
      { type: CommandType.Log, payload: { message: "not an api response" } },
    ]

    it("should return everything untouched when nothing is hidden", () => {
      expect(filterStatusCategory(API_COMMANDS, [])).toEqual(API_COMMANDS)
    })

    it("should hide only api response commands in the given categories", () => {
      const result = filterStatusCategory(API_COMMANDS, ["clientError", "serverError"])

      expect(result).toEqual([API_COMMANDS[0], API_COMMANDS[3]])
    })

    it("should never hide non-api commands", () => {
      const result = filterStatusCategory(API_COMMANDS, ["success", "clientError", "serverError"])

      expect(result).toEqual([API_COMMANDS[3]])
    })
  })
})
