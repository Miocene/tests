import GlButton from '../../base/button/button.vue';
import GlFormGroup from '../../base/form/form_group/form_group.vue';
import GlFormInput from '../../base/form/form_input/form_input.vue';
import GlFormTextarea from '../../base/form/form_textarea/form_textarea.vue';
import GlFormCheckbox from '../../base/form/form_checkbox/form_checkbox.vue';
import GlCollapsibleListbox from '../../base/new_dropdowns/listbox/listbox.vue';
import GlCard from '../../base/card/card.vue';
import GlTabs from '../../base/tabs/tabs/tabs.vue';
import GlTab from '../../base/tabs/tab/tab.vue';
import GlButtonGroup from '../../base/button_group/button_group.vue';
import GlLink from '../../base/link/link.vue';
import GlPagination from '../../base/pagination/pagination.vue';
import readme from './transition.md';
import './style.css';

const components = { 
  GlButton, 
  GlFormGroup, 
  GlFormInput, 
  GlFormTextarea, 
  GlFormCheckbox, 
  GlCollapsibleListbox, 
  GlCard, 
  GlTabs, 
  GlTab, 
  GlButtonGroup,
  GlLink,
  GlPagination,
};

export const BothTransitions = () => ({
  components,
  data() {
    return {
      e1_page: 2,
      e2_page: 2,
      
      e1_more: [
        { text: 'Five', value: 1 },
        { text: 'Six', value: 2 },
        { text: 'Seven', value: 3 },
      ],
      e2_more: [
        { text: 'Five', value: 1 },
        { text: 'Six', value: 2 },
        { text: 'Seven', value: 3 },
      ],
      
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
      <div class="t-grid">
        <div class="t-form-1">
          <gl-card>
            <h1>New Issue</h1>

            <gl-tabs>
              <gl-tab title="Issue"></gl-tab>
              <gl-tab title="Incident"></gl-tab>
              <gl-tab title="Bug report"></gl-tab>
              <gl-tab title="UI Polish task"></gl-tab>
            </gl-tabs>

            <gl-form-group
              :optional="false"
              label="Title"
            >
              <gl-form-input id="e1-group1" />
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
              <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least <gl-link href="#">Reporter access</gl-link>.</gl-form-checkbox>
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
              label="Choose something"
            >
              <gl-button-group>
                <gl-button>One</gl-button>
                <gl-button>Two</gl-button>
                <gl-button>Three</gl-button>
                <gl-button>Four</gl-button>

                <gl-collapsible-listbox
                  :items="e1_more"
                  toggle-text="More"
                  text-sr-only
                />
              </gl-button-group>
            </gl-form-group>
            
            <gl-form-group
              :optional="false"
            >
              <gl-button variant="confirm" >Create issue</gl-button>
              <gl-button variant="default">Cancel</gl-button>
            </gl-form-group>

          </gl-card>
          <gl-pagination v-model="e1_page" :per-page="10" :total-items="30" />
        </div>
        
        
        
        <div class="t-form-3">
          <gl-card>
            <h1>New Issue</h1>

            <gl-tabs>
              <gl-tab title="Issue"></gl-tab>
              <gl-tab title="Incident"></gl-tab>
              <gl-tab title="Bug report"></gl-tab>
              <gl-tab title="UI Polish task"></gl-tab>
            </gl-tabs>

            <gl-form-group
              :optional="false"
              label="Title"
            >
              <gl-form-input id="e2-group1" />
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
              <gl-form-checkbox value="confidential">This issue is confidential and should only be visible to team members with at least <gl-link href="#">Reporter access</gl-link>.</gl-form-checkbox>
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
              label="Choose something"
            >
              <gl-button-group>
                <gl-button>One</gl-button>
                <gl-button>Two</gl-button>
                <gl-button>Three</gl-button>
                <gl-button>Four</gl-button>

                <gl-collapsible-listbox
                  :items="e2_more"
                  toggle-text="More"
                  text-sr-only
                />
              </gl-button-group>
            </gl-form-group>
            
            <gl-form-group
              :optional="false"
            >
              <gl-button variant="confirm" >Create issue</gl-button>
              <gl-button variant="default">Cancel</gl-button>
            </gl-form-group>

          </gl-card>
          <gl-pagination v-model="e1_page" :per-page="10" :total-items="30" />
        </div>
      </div>
    `,
});

export default {
  title: 'exp/transition',
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};