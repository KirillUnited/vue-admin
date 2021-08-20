import Editor from "./Editor.js";

window.editor = new Editor;

new Vue({
    el: "#app",
    data: {
        pages: [1, 2, 3],
        showLoader: true,
    },
    methods: {
        onBtnSave() {
            this.showLoader = true;
            window.editor.save(
                () => {
                    this.showLoader = false;
                    UIkit.notification({ message: 'Success message...', status: 'success' });
                },
                () => {
                    this.showLoader = false;
                    UIkit.notification({ message: 'Danger message...', status: 'danger' });
                }
            );
        },
        injectExternalScripts() {
            let uikitScript = document.createElement('script');
            uikitScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/uikit@3.7.0/dist/js/uikit.min.js');
            document.head.appendChild(uikitScript);
        },
        openPage(page) {
            this.showLoader = true;
            window.editor.open(page, () => {
                this.showLoader = false;
            });
        }
    },
    created() {
        this.injectExternalScripts();

        window.editor.open('index.html', () => {
            this.showLoader = false;
        });

        axios.get("./api/pageList.php")
            .then((response) => {
                this.pages = response.data;
            });
    }
})