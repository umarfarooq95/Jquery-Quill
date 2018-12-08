(function($){
    $.fn.quill = quillInit;
    var quillBox;



    function quillInit(){
        var this$ = $(this);
        buildQuillEditor(this$);
        var textBox =document.createElement('div');
        var textBoxParagraph =document.createElement('p');
        var inputNode =document.createElement('input');
        inputNode.onchange = onChangeShowHtmlCheckbox
        var labelNode =document.createElement('label');
        var checkboxWrapper = document.createElement('div');
        textBox.className = 'textBox';
        textBox.setAttribute("contenteditable", true);
        textBox.setAttribute("id", 'textBox');
        textBox.style.width = '700px';
        textBox.style.height = '300px';
        textBoxParagraph.innerText = "Default"
        inputNode.type="checkbox"
        inputNode.id="showHtml"
        labelNode.htmlFor="showHtml"
        labelNode.innerText="Show Html"
        textBox.appendChild(textBoxParagraph);
        this$[0].appendChild(textBox);
        checkboxWrapper.style.textAlign = 'center';
        checkboxWrapper.style.margin = '5px';
        checkboxWrapper.appendChild(inputNode)
        checkboxWrapper.appendChild(labelNode)
        this$[0].appendChild(checkboxWrapper);
        quillBox = document.getElementById('textBox')
    }

    function buildQuillEditor(currentEle){
        var formatImg = [
            {
                imgUrl:"https://cdn4.iconfinder.com/data/icons/proglyphs-editor/512/Bold-512.png",
                id:'bold'
            },
            {
                imgUrl: "https://cdn4.iconfinder.com/data/icons/proglyphs-editor/512/Italic-512.png",
                id:'italic'
            },
            {
                imgUrl: "http://icons.iconarchive.com/icons/icons8/ios7/256/Editing-Underline-icon.png",
                id:'underline'
            },
            {
                imgUrl: "https://cdn2.iconfinder.com/data/icons/text-editing-1/100/text_editing-12-512.png",
                id:'justifyleft'
            },
            {
                imgUrl: "https://cdn2.iconfinder.com/data/icons/text-format/64/_Align_Center-512.png",
                id:'justifycenter'
            },
            {
                imgUrl: "https://cdn2.iconfinder.com/data/icons/text-editing-1/100/text_editing-14-512.png",
                id:'justifyright'
            }
        ]
        var formattingWrapper = $('<div></div>').addClass('formatting-wrapper');
        formatImg.forEach(function(img){
            var box = $('<button></button>').addClass('box').attr({
                id:img.id
            });
            box[0].onclick= onClickFormatDoc;
            var svg = $('<img/>').attr({
                src:img.imgUrl,
                width: '20px'
            })
            box.append(svg)
            formattingWrapper.append(box)
        })
        currentEle.append(formattingWrapper)
    }

    function onClickFormatDoc(){
        var self = $(this)[0]
        document.execCommand(self.id, false, 'div');
        if(!self.classList.contains('active')){
            $(this).addClass('active')
        }
        else{
            self.classList.remove('active')
        }
    }

    function onChangeShowHtmlCheckbox(e){
        var quillContent;
        if(e.currentTarget.checked){
            quillContent = document.createTextNode(quillBox.innerHTML);
            quillBox.innerHTML = "";
            var pre = document.createElement("pre");
            quillBox.contentEditable = false;
            pre.id = "sourceText";
            pre.contentEditable = true;
            pre.appendChild(quillContent);
            quillBox.appendChild(pre);
            document.execCommand("defaultParagraphSeparator", false, "div");
        }
        else {
            if (document.all) {
                quillBox.innerHTML = quillBox.innerText;
            } else {
                quillContent = document.createRange();
                quillContent.selectNodeContents(quillBox.firstChild);
                quillBox.innerHTML = quillContent.toString();
            }
            quillBox.contentEditable = true;
          }
    }

}(jQuery))

$(document).ready(function(){
    $('.quill').quill()
})