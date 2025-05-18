// function createName(fName: string, age: number, handsome: boolean, lName?: string): string {
//     let name = "Dong"
//     name = `${fName} ${lName} tuoi ${age} ${handsome ? "đẹp trai" : "cũng vẫn đẹp trai"}`
//     return name
// }
// console.log(createName("Tran", 23, true, "Đông"));
// function totalSum(arrNumber: number[]): number {
//     return arrNumber.reduce((acc, cur) => {
//         return acc += cur
//     }, 0)
// }
// const arrNumber: number[] = [1, 2, 3, 4, 5, 6]
// console.log(totalSum(arrNumber));
// type TFrontend = {
//     frontend: string[]
// }
// type TBackend = {
//     backend: string[]
// }
// interface IObject {
//     name: string | number;
//     age: number;
//     address: string | string[]
//     lang?: [TFrontend & TBackend]
// }
// interface IInterest extends IObject {
//     interest?: string[]
// }
// const object: IInterest = {
//     name: "Đông",
//     age: 23,
//     address: "Nam Định",
//     interest: ["Đá cầu", "Cầu lông"]
// }
// console.log(object);
// type ID = string
// interface IBase {
//     id: ID,
//     name: string
// }
// interface IData extends IBase {
//     age: number,
//     address: string[]
// }
// interface IProduct extends IBase {
//     price: number,
//     total: number,
// }
// const sanpham1: IProduct = {
//     id: '2jifhd',
//     name: "Xe hon da",
//     price: 100,
//     total: 100,
// }
// console.log(sanpham1);
const arr = "Học JavaScript không khó, Học javascript khó đã có CodeFarm lo, CodeFarm - Học là có việc!"


function highlightKeyword(content, keyword) {
    const narr = arr.split('')
    for (let i = 0; i < content.length; i++) {
        if (keyword[i] === length) {
            return keyword += `<strong>JavaScript</strong>`
        }
    }
    return narr
}
highlightKeyword(arr)