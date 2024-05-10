import GlButton from '../../base/button/button.vue';
import GlFormGroup from '../../base/form/form_group/form_group.vue';
import GlFormInput from '../../base/form/form_input/form_input.vue';
import GlFormTextarea from '../../base/form/form_textarea/form_textarea.vue';
import GlFormCheckbox from '../../base/form/form_checkbox/form_checkbox.vue';
import GlCollapsibleListbox from '../../base/new_dropdowns/listbox/listbox.vue';
import GlCard from '../../base/card/card.vue';
import readme from './duration.md';
import './style.css';

const components = { GlButton, GlFormGroup, GlFormInput, GlFormTextarea, GlFormCheckbox, GlCollapsibleListbox, GlCard };

export const AllExps = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      e3_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e3_type_selected: 1,
      e4_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e4_type_selected: 1,
      e5_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e5_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
      e3_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e3_assignee_selected: 1,
      e4_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e4_assignee_selected: 1,
      e5_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e5_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-1">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-2">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-3">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e3-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e3_type_selected"
              :items="e3_type_items"
              id="e3-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Description"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e3-group3"
              :characterCount="null"
              :rows="8"
              label-description="Add description templates to help your contributors to communicate effectively!"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e3_assignee_selected"
              :items="e3_assignee_items"
              id="e3-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-4">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e4-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e4_type_selected"
              :items="e4_type_items"
              id="e4-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Description"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e4-group3"
              :characterCount="null"
              :rows="8"
              label-description="Add description templates to help your contributors to communicate effectively!"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e4_assignee_selected"
              :items="e4_assignee_items"
              id="e4-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-5">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e5-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e5_type_selected"
              :items="e5_type_items"
              id="e5-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Description"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e5-group3"
              :characterCount="null"
              :rows="8"
              label-description="Add description templates to help your contributors to communicate effectively!"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e5_assignee_selected"
              :items="e5_assignee_items"
              id="e5-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp12 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-1">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-2">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp13 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-1">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-3">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp14 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-1">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-4">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp15 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-1">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-5">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp23 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-2">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-3">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp24 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-2">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-4">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp25 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-2">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-5">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp34 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-3">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-4">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp35 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-3">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-5">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export const Exp45 = () => ({
  components,
  data() {
    return {
      e1_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e1_type_selected: 1,
      e2_type_items: [
        { text: 'Issue', value: 1 },
        { text: 'Incident', value: 2 },
      ],
      e2_type_selected: 1,
      
      e1_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e1_assignee_selected: 1,
      e2_assignee_items: [
        { text: 'Unassigned', value: 1 },
        { text: 'Arlyne Roob', value: 2 },
        { text: 'Bertha Hansen', value: 3 },
        { text: 'Elva Wolf', value: 4 },
        { text: 'Ione Fahey', value: 5 },
        { text: 'Isabella Reilly', value: 6 },
        { text: 'Lindsay Hudson', value: 7 },
        { text: 'Sheilah Koepp', value: 8 },
      ],
      e2_assignee_selected: 1,
    };
  },
  template: `
      <div class="e-grid">
        <gl-card class="e-form-4">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e1-group1"
            label="Title"
          >
            <gl-form-input id="e1-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e1_type_selected"
              :items="e1_type_items"
              id="e1-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e1-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e1_assignee_selected"
              :items="e1_assignee_items"
              id="e1-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e1-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
        
        <gl-card class="e-form-5">
          <h1>New Issue</h1>

          <gl-form-group
            :optional="false"
            label-for="e2-group1"
            label="Title"
          >
            <gl-form-input id="e2-group1" />
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group2"
            label="Type"
          >
            <gl-collapsible-listbox
              v-model="e2_type_selected"
              :items="e2_type_items"
              id="e2-group2"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group3"
            label="Description"
            label-description="Add description templates to help your contributors to communicate effectively!"
          >
            <gl-form-textarea
              placeholder="Write a description or drag your files here…"
              noResize
              id="e2-group3"
              :characterCount="null"
              :rows="8"
            />
            <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least Reporter access.</gl-form-checkbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group4"
            label="Assignees"
          >
            <gl-collapsible-listbox
              v-model="e2_assignee_selected"
              :items="e2_assignee_items"
              id="e2-group4"
              block
            >
            </gl-collapsible-listbox>
          </gl-form-group>
          
          <gl-form-group
            :optional="false"
            label-for="e2-group5"
          >
            <gl-button variant="confirm" >Create issue</gl-button>
            <gl-button variant="default">Cancel</gl-button>
          </gl-form-group>
        </gl-card>
      </div>
    `,
});

export default {
  title: 'exp/duration',
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};