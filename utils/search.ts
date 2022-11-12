export function search({keyword,targets }:{keyword:string, targets:[]}) {
    targets.filter((target:string)=> {
        return target.includes(keyword);
    });
}

