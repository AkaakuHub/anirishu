// anime_title_object.d.ts
declare module '*/anime_title_object.json' {
    interface AnimeTitleObject {
        aid : string;
        time : string;
        koma : string;
        url : string;
        kw : string;
    }
    const animeTitleObject: AnimeTitleObject;
    export default animeTitleObject;
}
