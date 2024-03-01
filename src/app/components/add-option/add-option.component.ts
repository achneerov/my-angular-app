// add-option.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OptionService } from '../../services/option.service'; // Adjust the path accordingly

@Component({
  selector: 'add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class AddOptionComponent implements OnInit {
  @Output() optionAdded = new EventEmitter<string[]>();
  optionForm!: FormGroup; // Use definite assignment assertion

  constructor(private fb: FormBuilder, private optionService: OptionService) {}

  ngOnInit(): void {
    this.optionForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

onSubmit(): void {
  if (this.optionForm.valid) {
    const newOptionArray = this.optionForm.value.message
      .split(',')
      .map((option: string) => option.trim()); // Specify the type of 'option'

    // Check if the array is well formatted
    if (newOptionArray.length > 0) {
      this.optionService.addFormattedOption(newOptionArray);
      this.optionForm.reset(); // Reset the form after submitting
    }
  }
}

}
