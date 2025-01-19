
export function checkAuth(req, res, next) {
    let isAuthenticated = true; //req.session.user && req.session.user.isAuthenticated;

    if (isAuthenticated) {
        next()
    } else {
        res.redirect('/login')
    }
}
export const showLogin = (req, res) => res.render('auth/login',{title:'Login',layout:'plain'});

export async function authenticate(req, res) {

    const { email, password } = req.body;

    if (!email || !password) {
        res.redirect('/login');
        return;
    }

    if (email.toLowerCase() == "admin@admin.com" && password === 'password') {
        req.session.user = {
            email,
            isAuthenticated: true
        };
        res.redirect('/guitars');
    } else {
        res.redirect('/login');
        return;
    }
}
export function logout(req,res){
    req.session.destroy();
    console.log('sss');
    res.redirect('/');
}