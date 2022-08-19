import { hello } from "./sub";

test("test hello", () => {
    expect(hello()).toBe("hello");
});
