const App = 
{
    components:
    {
        "checksheet": checkSheet,
        "settingEditor": checkSheetEditor,
    },

    data()
    {
        return {
            sheet: new sheetManager(sheetData),

            selectedCheckItem: null,
            isEnabledOutputButton: false,
        }
    },

    methods:
    {
        onSelectedComponent(event, target)
        {
            event.cancelBubble = true;
            this.selectedCheckItem = target;
        },

        onApplyItemProperty(event, item)
        {    
        
   
        },

        onRemoveItem(event, item)
        {
            if (item.parent != null)
            {
                item.parent.items = item.parent.items.filter(e => e.ID != item.ID);
            }
        },

        onChangeCompleted(value)
        {
            this.isEnabledOutputButton = value;
        },

        attack()
        {
            this.$refs["sheetBody"].showResult();
        }
    },

    template: `
        <!-- <div class="container"> -->
            <nav class="navbar navbar-dark bg-dark sticky-top">
                <div class="container-fluid">
                        <span class="navbar-brand" href="#">チェックシート</span>
                        <button @click="attack" class="btn btn-success" v-bind:disabled="!isEnabledOutputButton">{{isEnabledOutputButton ? "チェック結果を出力" : "未入力・未選択の項目があります"}}</button>
                </div>
            </nav>

            <div class="container-fluid">
                <div class="row">
                <div class="col-sm-5 sheet-body">
                    <aside  class="bd-sidebar">
                    <settingEditor :selectedCheckItem="selectedCheckItem" v-bind="{ sheet, onApplyItemProperty, onRemoveItem }"></settingEditor>
                    </aside>
                </div>                    
                    <div class="col-sm sheet-body">                            
                        <checksheet ref="sheetBody" v-bind="{ sheet, onSelectedComponent, onChangeCompleted }" :isEditable='true'>
                        </checksheet>
                    </div>
                </div>
            </div>
        <!-- </div> -->

   
    `
}