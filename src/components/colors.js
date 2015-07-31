const domainColors = {
  "default": "#314453",
  "science": "#94424f",
  "humanities": "#ad3434",
  "economics": "#b77033",
  "cs": "#437a39",
  "partner-content": "#218270",
  "math": "#1c758a",
  "test-prep": "#644172",
  "sat": "#0084ce",
};

// Lol:
//    cat stylesheets/shared-package/variables.less \
//      | grep 'SubjectColor:' \
//      | sed 's/@/"/' \
//      | sed 's/SubjectColor/"/' \
//      | sed 's/  */ /' \
//      | sed 's/\([#0-9a-f]*\);/"\1",/'
const subjectColors = {
  "default": "#4d6779",
  "science": "#9d4a5a",
  "humanities": "#c13b31",
  "economics": "#bf7b34",
  "cs": "#53893e",
  "partnerContent": "#2c8d7b",
  "math": "#46a8bf",
  "testPrep": "#7e5f8e",
  "sat": "#0084ce",
};

const topicColors = {
  "default": "#6a8da6",
  "science": "#c55f73",
  "humanities": "#d24a45",
  "economics": "#d1933b",
  "cs": "#689b51",
  "partnerContent": "#329a86",
  "math": "#4fbad4",
  "testPrep": "#9a72ac",
  "sat": "#0084ce",
};

const _getColor = (colors, slug) => (colors[slug] || colors["default"])

export const getDomainColor = domainSlug => _getColor(domainColors, domainSlug)
export const getSubjectColor = subjectSlug => _getColor(subjectColors, subjectSlug)
export const getTopicColors = topicSlug => _getColor(topicColors, topicSlug)
