import config from 'config';
import superagent from 'superagent';
import superagentJsonp from 'superagent-jsonp';
import TopicTree from './TopicTree';

if (__CLIENT__) {
  superagentJsonp(superagent);
}

let _FULL_RAW_TOPICTREE_DATA = null;

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
  constructor(req) {
    // TODO(jlfwong): Perhaps support more than just get?
    ['get' /*, 'post', 'put', 'patch', 'del'*/].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            let request = superagent[method](
              `https://www.khanacademy.org/${path}`);

            if (__CLIENT__) {
              request.jsonp()
            }

            if (options && options.params) {
              request.query(options.params);
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                reject(res.body || err);
              } else {
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  loadPaths(paths) {
    return new Promise((resolve, reject) => {
      if (__SERVER__) {
        resolve(TopicTree.getDataForPaths(
                                paths,
                                _FULL_RAW_TOPICTREE_DATA));
      } else {
        superagent.get(`/api/${paths.join(",")}`).end((err, res) => {
          if (err) {
            reject((res && res.body) || err);
          } else {
            resolve(res.body);
          }
        })
      }
    });
  }
}

const ApiClient = ApiClient_;

if (__SERVER__) {
  // TODO(jlfwong): Make this actually download data from KA instead of just
  // pulling from disk.

  /*
  const PROJECTION = JSON.stringify({
      topics:[{
          id: 1,
          slug: 1,
          translatedTitle: 1,
          translatedDescription: 1,
          childData: 1
      }],
      videos: [{
          id: 1,
          slug: 1,
          translatedTitle: 1,
          translatedDescription: 1,
          translatedYoutubeId: 1
      }]
  });

  const TOPIC_TREE_URL = `https://www.khanacademy.org/api/v2/topics/topictree?projection=${PROJECTION}`;
  */

  const raw = JSON.parse(require("fs").readFileSync(`${__dirname}/../static/topictree.json`));
  _FULL_RAW_TOPICTREE_DATA = TopicTree.indexData(raw);
}


export default ApiClient;
