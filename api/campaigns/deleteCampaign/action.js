'use strict';

import { Campaign } from 'moonmail-models';
import { debug } from '../../lib/logger';
import decrypt from '../../lib/auth-token-decryptor';
import { ApiErrors } from '../../lib/errors';

export function respond(event, cb) {
  debug('= deleteCampaign.action', JSON.stringify(event));
  decrypt(event.authToken).then((decoded) => {
    if (event.campaignId) {
      Campaign.delete(decoded.sub, event.campaignId).then(result => {
        debug('= deleteCampaign.action', 'Success');
        return cb(null, result);
      })
      .catch(e => {
        debug('= deleteCampaign.action', e);
        return cb(e);
      });
    } else {
      return cb('No campaign specified');
    }
  })
  .catch(err => cb(ApiErrors.response(err), null));
}
