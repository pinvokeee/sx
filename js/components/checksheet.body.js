const checkSheet =
{
    props:
    {
        onSelectedComponent:
        {
            type: Function
        },

        onChangeCompleted:
        {
            type: Function
        },

        isEditable:
        {
            type: Boolean
        }
    },

    components:
    {
        "checksheetblock": checkSheetBlock
    },

    data()
    {
        return {
            button_enabled: false,
            _output: [],
            
            sheet: new sheetManager(sheetData),
            _canOutput: false,

            resultModal: null,
        }
    },

    mounted()
    {
        this.resultModal = new bootstrap.Modal(this.$refs["modal"], {
            keyboard: false
        });
    },

    computed:
    {
        canOutput:
        {
            get()
            {
                return this._canOutput;
            },

            set(value)
            {
                this._canOutput = value;
                this.onChangeCompleted(value);
            }
        },
    },

    methods:
    {
        onStateChange(target, newState)
        {
            this.sheet.setState(target, newState);  
            this.canOutput = this.sheet.getCanOutputLog();
        },

        click()
        {
            console.log(this.sheet.generateCheckLog());
        },

        showResult()
        {
            this.resultModal.show();
        }
    },
    
    template:`

        <div v-for="item in sheet.getItems()" :key="item.id">
            <checksheetblock :isEditable="isEditable" :target="item" :enabled="true" v-bind="{onStateChange, onSelectedComponent}"></checksheetblock>
        </div>

        <!-- <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" v-bind:disabled="!canOutput" @click="click">{{canOutput ? "出力" : "未入力・未選択の項目があります"}}</button> -->

        <!-- Modal -->
        <div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" data-bs-backdrop="static"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">貼り付け用</h5>
            </div>
            <div class="modal-body">
                <textarea style="width:100%;height:300px;">{{this.sheet.generateCheckLog()}}</textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
            </div>
            </div>
        </div>
        </div>

    `
}