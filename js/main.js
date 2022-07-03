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
            selectedCheckItem: null
        }
    },

    methods:
    {
        onSelectedComponent(event, target)
        {
            // event.cancelBubble = true;
            // console.log(target);

            // this.selectedCheckItem = target;
        },

    },

    template: `
 
        <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <checksheet v-bind="{ onSelectedComponent }">
                
                </checksheet>
            </div>
            <div class="col-sm-2">
                <!-- <settingEditor v-bind="{ selectedCheckItem }"></settingEditor> -->
            </div>
        </div>
        </div>

   
    `
}