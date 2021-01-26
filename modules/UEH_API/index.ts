var request = require("request-promise-native");
var cheerio = require("cheerio");
const API_SERVER = "http://online.ueh.edu.vn";
let __VIEWSTATE = "";
let __VIEWSTATEGENERATOR = "";
let __EVENTVALIDATION = "";

class UEH_API {
    jar: any;
    constructor() {
        this.jar = request.jar();
        request = request.defaults({
            headers: {
                accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language":
                    "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "upgrade-insecure-requests": "1",
                cookie:
                    "_ga=GA1.3.558671917.1606993663; _fbp=fb.2.1606993664855.1318858175; ASP.NET_SessionId=klx4fdtul3ja3ohyuvnov0pe",
            },
            referrerPolicy: "strict-origin-when-cross-origin",
            referrer: "http://online.ueh.edu.vn/",
            mode: "no-cors",
        });
    }
    requestServer(
        data = {
            formData: "",
            isTransform: false,
        }
    ) {
        let form = {
            uri: API_SERVER,
            jar: this.jar,
            method: typeof data.formData === "object" ? "post" : "get",
            formData: data.formData,

        };
        if (data.isTransform) form.transform = (body) => cheerio.load(body);
        return request(form);
    }

    fetchHiddenParam() {
        return new Promise(async (reslove, reject) => {
            try {
                const $ = await this.requestServer({isTransform: true });
                __VIEWSTATEGENERATOR = $("#__VIEWSTATEGENERATOR").val();
                __EVENTVALIDATION = $("#__EVENTVALIDATION").val();
                __VIEWSTATE = $("#__VIEWSTATE").val();

                reslove("loaded");
            } catch (err) {
                reject(err);
            }
        });
    }

    login(userID: string, userPassword: string) {
        return new Promise(async (reslove, reject) => {
            try {
                const $ = await this.requestServer({
                    formData: {
                        __EVENTTARGET: "ctl00$lbtDangnhap",
                        __EVENTARGUMENT: "",
                        __VIEWSTATE,
                        __VIEWSTATEGENERATOR,
                        __EVENTVALIDATION,
                        ctl00$ContentPlaceHolder1$ctl00$ctl00$Role: "rbtnStudent",
                        ctl00$ContentPlaceHolder1$ctl00$ctl00$txtUserName: userID,
                        ctl00$ContentPlaceHolder1$ctl00$ctl00$txtPassword: userPassword,
                        ctl00$ContentPlaceHolder1$ctl00$ctl00$btLogin: "Đăng nhập",
                    },
                    isTransform: true,
                });

                //if($('#lbtDangnhap').text() === 'ÄÄƒng ThoÃ¡t') reject('ÄÄƒng Nháº­p Tháº¥t Báº¡i');
                console.log($("#lbtDangnhap").text());
                __VIEWSTATEGENERATOR = $("#__VIEWSTATEGENERATOR").val();
                __EVENTVALIDATION = $("#__EVENTVALIDATION").val();
                __VIEWSTATE = $("#__VIEWSTATE").val();
                reslove(this.jar);
            } catch (err) {
                reject(err);
            }
        });
    }

    getStudentInfo() {
        return new Promise(async (reslove, reject) => {
            try {
                console.log(__VIEWSTATEGENERATOR);
                const $ = await this.requestServer({
                    pathURI: "/",
                    formData: {
                        __EVENTTARGET: "ctl00$ContentPlaceHolder1$ctl00$ctl00$lnkInfo",
                        __EVENTARGUMENT: "",
                        __VIEWSTATE,
                        __VIEWSTATEGENERATOR,
                        __EVENTVALIDATION,
                    },
                    isTransform: true,
                });

                let user = {
                    id: $("#ContentPlaceHolder1_ctl00_ctl00_ctl00_lbMaso").text(),
                    name: $("#ContentPlaceHolder1_ctl00_ctl00_ctl00_lbHoVaTen").text(),
                    birthDate: $(
                        "#ContentPlaceHolder1_ctl00_ctl00_ctl00_lbNgaysinh"
                    ).text(),
                    place: $("#ContentPlaceHolder1_ctl00_ctl00_ctl00_lbNoiSinh").text(),
                    gender: $("#ContentPlaceHolder1_ctl00_ctl00_ctl00_blGioiTinh").text(),
                    email: $(
                        "#ContentPlaceHolder1_ctl00_ctl00_ctl00_lbEmailInfor"
                    ).text(),
                    emailUEH: $(
                        "#ContentPlaceHolder1_ctl00_ctl00_ctl00_lbEmailInfo2"
                    ).text(),
                    avatar:
                        API_SERVER +
                        "/" +
                        $("#ContentPlaceHolder1_ctl00_ctl00_ctl00_imgStudents").attr("src"),
                };

                reslove(user);
            } catch (err) {
                reject(err);
            }
        });
    }

    getSchedule() {
        return new Promise(async (reslove, reject) => {
            try {
                let listSchedule = [];
                const $ = await this.requestServer({
                    formData: {
                        __EVENTTARGET:
                            "ctl00$ContentPlaceHolder1$ctl00$ctl00$lnkThoiKhoaBieu",
                        __EVENTARGUMENT: "",
                        __VIEWSTATE,
                        __VIEWSTATEGENERATOR,
                        __EVENTVALIDATION,
                    },
                    isTransform: true,
                });

                let scheduleTable = $(
                    "#ContentPlaceHolder1_ctl00_ctl00_ctl00_grvThoikhoabieu"
                )
                    .children("tbody")
                    .children();
                scheduleTable.map(function () {
                    const columns = $(this).children();
                    listSchedule.push({
                        weekIndex: $(columns[0]).find("span").text(),
                        subjectName: $(columns[1]).find("span").text(),
                        room: $(columns[2]).find("span").text(),
                        startAt: $(columns[3]).find("span").text(),
                        endAt: $(columns[4]).find("span").text(),
                        date: $(columns[5]).find("span").text(),
                        note: $(columns[6]).find("span").text(),
                    });
                });
                console.log(listSchedule);

                reslove("0k");
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = UEH_API;
