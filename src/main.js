
import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(300, () => {
    logger.info('app start;')
})