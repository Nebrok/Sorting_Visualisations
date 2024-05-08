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

class TopDownMergeSort {
    constructor(centre, width, height, list_data) {
        this._centre = centre
        this._width = width
        this._half_width = width/2
        this._height = height
        this._half_height = height/2

        this._bar_width = width / data.length

        this._input_data = list_data
        this._data = list_data

        this._aux_list = [list_data.slice(0)]
        this._current_index = 1
        this._split_status = "Incomplete"
        this._iteration_count = 0
        this._beginning_of_merge = 0

        this._word_index = 0
        this._working_list = []
        this._consolidated_on_last = true

        this._is_sorted = false

        this._number_swaps = 0


    }

    step() {

        if (this._split_status == "Incomplete") {
            if (this._iteration_count != 0) {this._aux_list = this._data.slice(0)}

            this._aux_list = this.split_lists(this._aux_list)
            if (this._aux_list.length == this._input_data.length) {
                this._split_status = "Complete"
                this._beginning_of_merge = this._iteration_count + 1
            }
            this._data = this._aux_list.slice(0)
            this._aux_list = []
        }
        else if (this._split_status == "Complete") {
            if (this._iteration_count == this._beginning_of_merge) {
                this._aux_list = this._data.slice(this._word_index)
            } else if (!this._consolidated_on_last){
                this._aux_list = this._data.slice(this._word_index + 1)
            } else {
                this._aux_list = this._data.slice(this._word_index)
            }

            //console.log("Aux list length " + this._aux_list.length)

            if (this._aux_list.length > 1) {
                let left_side = this._aux_list[0]
                let right_side = this._aux_list[1]
                
                if (left_side[0] <= right_side[0]) {
                    this._working_list.push(left_side[0])
                    left_side = left_side.slice(1)
                    this._number_swaps++;
                } else {
                    this._working_list.push(right_side[0])
                    right_side = right_side.slice(1)
                    this._number_swaps++;
                }

                if (left_side.length != 0 && right_side.length != 0) {
                    this._aux_list[0] = left_side
                    this._aux_list[1] = right_side

                    let sorted_from_data = this._data.slice(0,this._word_index)
                    //console.log(sorted_from_data)
                    //console.log(this._working_list)
                    let remaining_aux = this._aux_list.slice(0)
                    //console.log(remaining_aux)
                    this._data = sorted_from_data.concat([this._working_list]).concat(remaining_aux)
                    //console.log(this._data)

                    this._consolidated_on_last = false

                } else {
                    while (left_side.length != 0) {
                        this._working_list.push(left_side[0])
                        left_side = left_side.slice(1)
                    }
                    while (right_side.length != 0) {
                        this._working_list.push(right_side[0])
                        right_side = right_side.slice(1)
                    }
                    
                    let sorted_from_data = this._data.slice(0,this._word_index)
                    //console.log(sorted_from_data)
                    //console.log(this._working_list)
                    let offset = 0
                    if (!this._consolidated_on_last) {
                        offset = 1
                    }
                    let untouch_from_aux = this._data.slice(this._word_index + 2 + offset)
                    //console.log(untouch_from_aux)
                    this._data = sorted_from_data.concat([this._working_list]).concat(untouch_from_aux)

                    this._consolidated_on_last = true

                    this._word_index += 1;
                    this._working_list = []
                    //console.log(this._data)
                    //console.log("New runthrough")
                }   
            } else {
                this._word_index = 0
                //console.log("New runthrough")
            }
        }
        this._iteration_count++;

        /*///// HERHEHE
        Think it works, need to figure out how to check if sorted, also need to draw it
        therefore flatten whatever is in the data property then draw.
        */
    }

    split_lists(lists_to_split) {
        let result = []
        for (let i = 0; i < lists_to_split.length; i++) {

            let left = []
            let right = []
            let middle = lists_to_split[i].length / 2
            for (let j = 0; j < lists_to_split[i].length; j++) {
                if (j < middle) {
                    left.push(lists_to_split[i][j])
                } else {
                    right.push(lists_to_split[i][j])
                }
            }
            if (left.length != 0) {
                result.push(left)
            }
            if (right.length != 0) {
                result.push(right)
            }
        }
        return result
    }

    draw() {
        let flattened_data = this._data.flat()
        noStroke()
        let left_side_x = this._centre.x - this._half_width;
        let bottom_y = this._centre.y + this._half_height;

        for(let i = 0; i < flattened_data.length; i++) {
            let bar_height = map(flattened_data[i], 0, 1, 0, this._height)
            if(this._current_index == i) {
                fill(0, 255, 0);
            }
            rect(left_side_x + this._bar_width*i, bottom_y - bar_height, this._bar_width, bar_height);
            fill(255,255,255);
        }
    }

    sort() {
        this._number_swaps = 0
        let start_time = millis()
        this._data = this.merge_sort(this._data)

        let end_time = millis()
        let total_time_secs = (end_time - start_time) / 1000

        console.log("MergeSort complete in " + total_time_secs + " seconds")
        console.log("Total Number of swaps: " + this._number_swaps)
    }

    merge_sort(data) {
        if (data.length <= 1) {
            return data
        }

        let left = []
        let right = []
        let middle = data.length / 2
        for (let i = 0; i < data.length; i++) {
            if (i < middle) {
                left.push(data[i])
            } else {
                right.push(data[i])
            }
        }

        left = this.merge_sort(left)
        right = this.merge_sort(right)

        return this.merge(left, right)

    }

    merge(left, right) {
        var result = []

        while (left.length != 0 && right.length != 0) {
            if (left[0] <= right[0]) {
                result.push(left[0])
                left = left.slice(1)
                this._number_swaps++;
            } else {
                result.push(right[0])
                right = right.slice(1)
                this._number_swaps++;
            }
        }

        while (left.length != 0) {
            result.push(left[0])
            left = left.slice(1)
        }
        while (right.length != 0) {
            result.push(right[0])
            right = right.slice(1)
        }

        return result
    }
}
