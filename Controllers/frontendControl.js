const frontendControl = {
    loginSignup : async (req,res) => {
        return res.render("loginPage", {});
    },

    doctorOrUser: async(req,res) => {
        return res.render('doctorOrUser', {});
    },

    docRegist: async (req, res) => {
        return res.render('docRegisterPage', {});
    },

    userRegist: async (req, res) => {
        return res.render('userRegisterPage', {});
    }
}

module.exports = frontendControl;