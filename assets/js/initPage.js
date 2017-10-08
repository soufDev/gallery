export default class initPage {
    constructor() {

    }

    template () {
        return `
            <h1 style="text-align: center">Enter Number of picture you want to display</h1>
            <div class="col-lg-6 col-md-6 col-xs-12 col-lg-offset-2 col-md-offset-3 col-xs-offset-0">
                <div class="form-group">
                    <input type="number" class="form-control input-lg" id="pictureNumber" name="pictureNumber">
                </div>
                <input type="submit" class="btn btn-lg btn-success col-xs-offset-5 col-lg-offset-5 col-md-offset-5" value="submit">
            </div>    
        `
    }

}