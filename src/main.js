
import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(3000, () => {
    logger.info('app start;')
})