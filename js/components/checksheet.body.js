const checkSheet =
{
    props:
    {
        onSelectedComponent:
        {
            type: Function
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
            canOutput: false,
        }
    },

    mounted()
    {
    },

    methods:
    {
        onStateChange(target, newState)
        {
            this.sheet.setState(target, newState);  
            this.canOutput = this.sheet.getCanOutputLog();
        },

        onCompleted(target, value)
        {

        },

        click()
        {
            console.log(this.sheet.generateCheckLog());
        }
    },
    
    template:`

        <div v-for="item in sheet.getItems()" :key="item.id">
            <checksheetblock :target="item" :enabled="true" v-bind="{onStateChange, onCompleted, onSelectedComponent}"></checksheetblock>
        </div>

        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" v-bind:disabled="!canOutput" @click="click">{{canOutput ? "出力" : "未入力・未選択の項目があります"}}</button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static"  aria-labelledby="exampleModalLabel" aria-hidden="true">
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