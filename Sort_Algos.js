class BubbleSort {
    constructor(centre, width, height, list_data) {
        this._centre = centre
        this._width = width
        this._half_width = width/2
        this._height = height
        this._half_height = height/2

        this._input_data = list_data
        this._data = list_data

        this._bar_width = width / data.length

        this._iteration_count = 0
        this._swap_count = 0
        this._current_index = 1
        this._is_sorted = false;
        this._swapped = false;

    }

    draw() {
        noStroke()
        let left_side_x = this._centre.x - this._half_width;
        let bottom_y = this._centre.y + this._half_height;

        for(let i = 0; i < this._data.length; i++) {
            let bar_height = map(this._data[i], 0, 1, 0, this._height)
            if(this._current_index == i) {
                fill(0, 255, 0);
            }
            rect(left_side_x + this._bar_width*i, bottom_y - bar_height, this._bar_width, bar_height);
            fill(255,255,255);
        }
    }

    step() {
        if (!this._is_sorted) {
            this._iteration_count++;

            if (this._data[this._current_index-1] > this._data[this._current_index]) {
                let current = this._data[this._current_index];
                this._data[this._current_index] = this._data[this._current_index-1];
                this._data[this._current_index-1] = current;

                this._swap_count++;
                this._swapped = true;
            }

            this._current_index++;
            if (this._current_index == this._data.length) {
                this._current_index = 1;
                //Check if the list is sorted
                if (this._swapped == false) {
                    this._is_sorted = true
                    console.log("BubbleSort complete")
                    console.log("Number of iterations: " + this._iteration_count)
                    console.log("Number of swaps: " + this._swap_count)
                }
                this._swapped = false;
            }
        };
    }

    sort() {
        let start_time = millis()
        let swapped = false;
        do {
            swapped = false
            for(let i = 1; i < this._data.length; i++) {
                this._iteration_count++;
                if (this._data[i-1] > this._data[i]) {
                    let current = this._data[i];
                    this._data[i] = this._data[i-1];
                    this._data[i-1] = current;
                    swapped = true

                    this._swap_count++;
                }
            }
        } while (swapped);
        this._is_sorted = true;

        let end_time = millis()
        let total_time_secs = (end_time - start_time) / 1000

        console.log("BubbleSort complete in " + total_time_secs + " seconds")
        console.log("Number of iterations: " + this._iteration_count)
        console.log("Number of swaps: " + this._swap_count)
        
    }

    is_sorted(){
        return this._is_sorted;
    }

}

class OptimisedBubbleSort extends BubbleSort {
    constructor(centre, width, height, data) {
        super(centre, width, height, data);

        this._number_items = this._data.length
    }

    step() {
        if (!this._is_sorted) {
            this._iteration_count++;

            if (this._data[this._current_index-1] > this._data[this._current_index]) {
                let current = this._data[this._current_index];
                this._data[this._current_index] = this._data[this._current_index-1];
                this._data[this._current_index-1] = current;

                this._swap_count++;
                this._swapped = true;
            }

            this._current_index++;
            if (this._current_index == this._number_items) {
                this._current_index = 1;
                this._number_items--;
                //Check if the list is sorted
                if (this._swapped == false) {
                    this._is_sorted = true
                    console.log("OptimisedBubbleSort Complete")
                    console.log("Number of iterations: " + this._iteration_count)
                    console.log("Number of swaps: " + this._swap_count)
                }
                this._swapped = false;
            }
        };
    }

    sort() {
        let list_length = this._data.length
        let start_time = millis()
        let swapped = false;
        do {
            swapped = false
            for(let i = 1; i < list_length; i++) {
                this._iteration_count++;
                if (this._data[i-1] > this._data[i]) {
                    let current = this._data[i];
                    this._data[i] = this._data[i-1];
                    this._data[i-1] = current;
                    swapped = true

                    this._swap_count++;
                }
            }
            list_length--;
        } while (swapped);
        this._is_sorted = true;

        let end_time = millis()
        let total_time_secs = (end_time - start_time) / 1000

        console.log("OptimisedBubbleSort complete in " + total_time_secs + " seconds")
        console.log("Number of iterations: " + this._iteration_count)
        console.log("Number of swaps: " + this._swap_count)
    }
}

